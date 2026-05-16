export default {
    name: 'trainingPhoto',
    title: 'Fotos de Entrenamiento',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'caption',
            title: 'Descripción (Opcional)',
            type: 'string',
        },
        {
            name: 'location',
            title: 'Sede',
            type: 'string',
            options: {
                list: [
                    { title: 'Ñuñoa', value: 'Ñuñoa' },
                    { title: 'San Miguel', value: 'San Miguel' },
                ],
                layout: 'radio',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'date',
            title: 'Fecha',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            validation: (Rule: any) => Rule.required(),
            initialValue: () => new Date().toISOString().split('T')[0]
        },
    ],
    preview: {
        select: {
            title: 'location',
            subtitle: 'date',
            media: 'image',
        },
        prepare(selection: any) {
            const { title, subtitle, media } = selection
            return {
                title: `Sede: ${title}`,
                subtitle: subtitle,
                media: media
            }
        }
    }
}
