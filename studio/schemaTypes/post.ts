import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Used in the web address. Click Generate.',
      options: {source: 'title', maxLength: 80},
      validation: (r) => r.required(),
    }),
    defineField({name: 'date', type: 'date', initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required()}),
    defineField({name: 'excerpt', title: 'Short summary', type: 'text', rows: 2, description: 'Shown on the blog list and in link previews.', validation: (r) => r.required()}),
    defineField({
      name: 'image',
      title: 'Cover image',
      type: 'image',
      validation: (r) => r.warning('Add a cover image, or a placeholder will be shown on the site.'),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'text',
      rows: 14,
      description: 'Plain text. Leave one blank line between paragraphs.',
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
})
