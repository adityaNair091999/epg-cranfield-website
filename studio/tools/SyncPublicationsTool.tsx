import { useState } from 'react';
import { Box, Button, Card, Container, Heading, Stack, Text, Spinner, Flex } from '@sanity/ui';

// Set in studio/.env before `sanity deploy`:
//   SANITY_STUDIO_PUBSYNC_URL=https://maple-pubsync.<subdomain>.workers.dev
//   SANITY_STUDIO_PUBSYNC_SECRET=...   (optional, only if the Worker uses TRIGGER_SECRET)
const WORKER_URL = process.env.SANITY_STUDIO_PUBSYNC_URL || '';
const SECRET = process.env.SANITY_STUDIO_PUBSYNC_SECRET || '';

type Result = {
  existing: number;
  fetched: number;
  added: { title: string; year: number }[];
  dryRun: boolean;
};

export function SyncPublicationsTool() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(dry: boolean) {
    if (!WORKER_URL) {
      setError('Not configured: set SANITY_STUDIO_PUBSYNC_URL in studio/.env and redeploy the Studio.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${WORKER_URL}${dry ? '?dry=1' : ''}`, {
        method: 'POST',
        headers: SECRET ? { 'X-Sync-Secret': SECRET } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setResult(data as Result);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container width={1} paddingX={4} paddingY={5}>
      <Stack space={4}>
        <Heading as="h1" size={3}>Sync publications</Heading>
        <Text size={1} muted>
          Pulls publications from OpenAlex and adds only ones not already listed.
          It never changes or removes existing entries, so any manual fixes are kept.
        </Text>

        <Flex gap={3} wrap="wrap">
          <Button text="Check for new (dry run)" tone="primary" mode="ghost"
            disabled={loading} onClick={() => run(true)} />
          <Button text="Sync now — add new papers" tone="primary"
            disabled={loading} onClick={() => run(false)} />
        </Flex>

        {loading && <Flex align="center" gap={2}><Spinner muted /><Text muted size={1}>Working…</Text></Flex>}

        {error && (
          <Card tone="critical" padding={3} radius={2} shadow={1}>
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {result && (
          <Card tone={result.added.length ? 'positive' : 'transparent'} padding={3} radius={2} shadow={1}>
            <Stack space={3}>
              <Text weight="semibold" size={1}>
                {result.dryRun ? 'Would add' : 'Added'} {result.added.length} publication(s)
                {'  '}({result.existing} already listed, {result.fetched} on OpenAlex)
                {result.dryRun ? '  — dry run, nothing written.' : ''}
              </Text>
              {result.added.map((a, i) => (
                <Text key={i} size={1}>+ {a.year || '—'} — {a.title}</Text>
              ))}
              {!result.added.length && <Text size={1} muted>Everything is up to date.</Text>}
            </Stack>
          </Card>
        )}

        <Box>
          <Text size={0} muted>
            New entries appear in the Publications list; feature or edit them there as usual.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
