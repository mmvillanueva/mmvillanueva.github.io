import {defineField, defineType} from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist & site info',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'email', title: 'Contact email', type: 'string', validation: (r) => r.required().email()}),
    defineField({name: 'statement', title: 'Artist statement', type: 'text', rows: 6, description: 'Shown on the About page and used for search previews.', validation: (r) => r.required()}),
    defineField({name: 'portrait', title: 'Portrait photo (About page)', type: 'image'}),
    defineField({name: 'studio', title: 'Studio photo (Contact page)', type: 'image'}),
  ],
  preview: {prepare: () => ({title: 'Artist & site info'})},
})
