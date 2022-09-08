import { newSpecPage } from '@stencil/core/testing';
import { TalisPdfViewer } from '../talis-pdf-viewer';

describe('talis-pdf-viewer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TalisPdfViewer],
      html: `<talis-pdf-viewer></talis-pdf-viewer>`,
    });
    expect(page.root).toEqualHtml(`
      <talis-pdf-viewer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </talis-pdf-viewer>
    `);
  });
});
