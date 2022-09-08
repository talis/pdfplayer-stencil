import { newE2EPage } from '@stencil/core/testing';

describe('talis-pdf-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<talis-pdf-viewer></talis-pdf-viewer>');

    const element = await page.find('talis-pdf-viewer');
    expect(element).toHaveClass('hydrated');
  });
});
