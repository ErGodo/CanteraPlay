How to add Sponsors to Sanity Studio

1) Add the schema to your Sanity Studio
- Copy `src/schemas/sponsor.ts` into your Sanity Studio `schemas` folder (usually in the `studio` project). If your Studio is in a separate repo, add the file there.
- Register the schema in the Studio's `schema.ts` (or `schema/index.ts`) by importing and including it in the `schemaTypes` array.

Example (Studio schema registration):

import sponsor from './sponsor'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([ sponsor ])
})

2) Start the Studio and create Sponsor documents
- Run the Studio dev server (e.g. `sanity start` from the studio folder).
- From Studio, create new documents of type "Sponsor". Fill `name`, upload `logo` (image), `website` and `priority`.
- Make sure to publish the documents.

3) Use Sponsors in the front-end
- The front-end helper `src/lib/getSponsors.ts` queries active sponsors ordered by `priority`.
- Example usage:

import { getSponsors } from '@/lib/getSponsors'

export default async function Page() {
  const sponsors = await getSponsors()
  return (<div>{sponsors.map(s => (<img key={s._id} src={s.logo?.url} alt={s.name} />))}</div>)
}

Notes:
- If your Studio uses a different dataset or projectId, ensure it matches the `src/sanity.ts` values or update those.
- For debugging, use Sanity Vision to run the GROQ query directly in Studio to confirm data.
