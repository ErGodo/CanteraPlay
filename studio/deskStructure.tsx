import VideoPreview from './components/VideoPreview'

// Use looser typing to avoid tight Sanity internal type mismatches in the Studio runtime.
export const getDefaultDocumentNode = (S: any, { schemaType }: any) => {
  // For documents that include smartVideo (like 'hero'), show a custom preview pane
  if (schemaType === 'hero') {
    return S.document().views([
      S.view.form().title('Content'),
      S.view.component(({ document }: { document: any }) => {
        const value = document.displayed?.smartVideo ?? document.displayed
        return <div style={{ padding: 12 }}>
          <h3>Video preview</h3>
          <VideoPreview value={value} />
        </div>
      }).title('Preview')
    ])
  }
  return S.document().views([S.view.form()])
}
