import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

// "Artist & site info" is a single document: no list, no "create new".
const singletons = ['artist']

export default defineConfig({
  name: 'default',
  title: 'MMVillanueva Studio',
  projectId: 't33pzyyd',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Artworks').schemaType('artwork').child(S.documentTypeList('artwork').title('Artworks')),
            S.listItem().title('Blog posts').schemaType('post').child(S.documentTypeList('post').title('Blog posts')),
            S.divider(),
            S.listItem().title('Artist & site info').id('artist').child(S.document().schemaType('artist').documentId('artist')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (input, {schemaType}) =>
      singletons.includes(schemaType) ? input.filter(({action}) => action && !['unpublish', 'delete', 'duplicate'].includes(action)) : input,
  },
})
