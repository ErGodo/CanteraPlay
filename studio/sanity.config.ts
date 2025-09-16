import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { getDefaultDocumentNode } from './deskStructure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'CanteraPlay',

  projectId: 'eahhf3d2',
  dataset: 'production',

  plugins: [structureTool({ defaultDocumentNode: getDefaultDocumentNode }), visionTool()],
  schema: {
    types: schemaTypes,
  },
})


