import {defineField, defineType} from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
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
    defineField({
      name: 'no',
      title: 'Number',
      type: 'string',
      description: 'Catalogue number such as 013. Must be unique. Works are listed in this order.',
      validation: (r) =>
        r
          .required()
          .regex(/^\d{3,}$/, {name: 'number', invert: false})
          .error('Use digits only, at least 3 (for example 013).')
          .custom(async (value, context) => {
            if (!value) return true
            const id = (context.document?._id ?? '').replace(/^drafts\./, '')
            const client = context.getClient({apiVersion: '2025-02-19'})
            const count = await client.fetch(
              'count(*[_type == "artwork" && no == $no && !(_id in [$id, "drafts." + $id])])',
              {no: value, id},
            )
            return count === 0 ? true : `Number ${value} is already used by another artwork.`
          }),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Straight-on, evenly lit photo. A placeholder shows until one is added.',
      validation: (r) => r.warning('Add a photo, or a placeholder will be shown on the site.'),
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (r) => r.required().integer().min(1900).max(2100),
    }),
    defineField({name: 'medium', type: 'string', description: 'For example: Oil on canvas', validation: (r) => r.required()}),
    defineField({name: 'size', type: 'string', description: 'For example: 90 × 120 cm', validation: (r) => r.required()}),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Reserved', value: 'reserved'},
          {title: 'Sold', value: 'sold'},
        ],
      },
      initialValue: 'available',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (PHP)',
      type: 'number',
      description: 'Whole pesos, numbers only (85000, not ₱85,000).',
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({name: 'note', title: 'Description', type: 'text', rows: 4, validation: (r) => r.required()}),
  ],
  orderings: [
    {title: 'Number, low to high', name: 'noAsc', by: [{field: 'no', direction: 'asc'}]},
    {title: 'Number, high to low', name: 'noDesc', by: [{field: 'no', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', no: 'no', status: 'status', media: 'image'},
    prepare: ({title, no, status, media}) => ({title, subtitle: `No. ${no ?? '?'} · ${status ?? ''}`, media}),
  },
})
