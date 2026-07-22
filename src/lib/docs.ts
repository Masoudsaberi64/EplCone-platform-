import { getAccessToken } from './auth';

export async function createGoogleDoc(title: string, textContent: string): Promise<string> {
  const token = await getAccessToken();
  if (!token) throw new Error('No access token');

  // 1. Create the document
  const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!createRes.ok) {
    throw new Error('Failed to create document');
  }

  const doc = await createRes.json();
  const documentId = doc.documentId;

  // 2. Insert text into the document
  const updateRes = await fetch(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: {
              index: 1,
            },
            text: textContent,
          },
        },
      ],
    }),
  });

  if (!updateRes.ok) {
    throw new Error('Failed to update document with content');
  }

  return documentId;
}
