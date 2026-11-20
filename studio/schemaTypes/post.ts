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
      name: 'media',
      title: 'Featured media (optional)',
      type: 'object',
      description:
        'Shown at the top of the post instead of the cover image. Leave it empty to keep showing the cover image. The cover image is still used on the blog list.',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'kind',
          title: 'What is it?',
          type: 'string',
          options: {
            layout: 'radio',
            list: [
              {title: 'Photo (upload)', value: 'image'},
              {title: 'Video (upload a file)', value: 'video'},
              {title: 'Link (YouTube, Vimeo, or a direct video/photo URL)', value: 'link'},
            ],
          },
        }),
        defineField({
          name: 'image',
          title: 'Photo',
          type: 'image',
          hidden: ({parent}) => parent?.kind !== 'image',
          validation: (r) =>
            r.custom((value, context) =>
              (context.parent as {kind?: string} | undefined)?.kind === 'image' && !value?.asset
                ? 'Upload a photo, or choose another type above.'
                : true,
            ),
        }),
        defineField({
          name: 'video',
          title: 'Video file',
          type: 'file',
          description: 'MP4 works best. Large files load slowly for visitors; a YouTube or Vimeo link is better for long videos.',
          options: {accept: 'video/*'},
          hidden: ({parent}) => parent?.kind !== 'video',
          validation: (r) => [
            r.custom((value, context) =>
              (context.parent as {kind?: string} | undefined)?.kind === 'video' && !value?.asset
                ? 'Upload a video file, or choose another type above.'
                : true,
            ),
            r
              .custom(async (value, context) => {
                const ref = (value as {asset?: {_ref?: string}} | undefined)?.asset?._ref
                if (!ref) return true
                const size = await context
                  .getClient({apiVersion: '2025-02-19'})
                  .fetch<number | null>('*[_id == $id][0].size', {id: ref})
                return size && size > 50 * 1024 * 1024
                  ? 'This video is over 50 MB and may load slowly. Consider a shorter or smaller file, or use a YouTube/Vimeo link.'
                  : true
              })
              .warning(),
          ],
        }),
        defineField({
          name: 'poster',
          title: 'Video preview image (optional)',
          type: 'image',
          description: 'Shown before the video starts.',
          hidden: ({parent}) => parent?.kind !== 'video',
        }),
        defineField({
          name: 'url',
          title: 'Link',
          type: 'url',
          description: 'A YouTube or Vimeo page link, or a direct link to an .mp4/.webm video or a .jpg/.png/.webp photo.',
          validation: (r) => [
            r.uri({scheme: ['https']}),
            r
              .custom((value, context) => {
                if ((context.parent as {kind?: string} | undefined)?.kind !== 'link') return true
                if (!value) return 'Paste a link, or choose another type above.'
                const known =
                  /^https:\/\/((www\.|m\.)?youtube\.com|youtu\.be|(www\.|player\.)?vimeo\.com)\//i.test(value) ||
                  /\.(mp4|webm|mov|m4v|ogv|jpe?g|png|webp|avif|gif)(\?.*)?$/i.test(value)
                return known ? true : 'This link type is not recognised, so the cover image will be shown instead.'
              })
              .warning(),
          ],
          hidden: ({parent}) => parent?.kind !== 'link',
        }),
        defineField({
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
          hidden: ({parent}) => !parent?.kind,
        }),
      ],
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
