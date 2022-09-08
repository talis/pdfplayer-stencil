import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'talis-pdf-viewer',
  styleUrl: 'talis-pdf-viewer.css',
  shadow: true,
})
export class TalisPdfViewer {
  @Prop() depotUrl: string;
  @Prop() token: string;
  @Prop() pageCount: number;
  @Prop() annotations: string[] = [];
  @State() documentImages: string[] = [];
  @State() hasLoaded = false;

  async connectedCallback() {
    this.documentImages = [];
    this.hasLoaded = false;
    let headers = { Authorization: `Bearer ${this.token}` };
    for (let i = 0; i < this.pageCount; i += 1) {
      await fetch(`${this.depotUrl}${i}&format=json`, { method: 'GET', headers, credentials: 'omit' })
        .then(async response => {
          const json = await response.json();
          this.documentImages.push(json.url);
        })
        .catch(err => console.error(err));
    }
    this.hasLoaded = true;
  }

  render() {
    return (
      <div>
        <p>Depot URL: {this.depotUrl}</p>
        <p>Token: {this.token}</p>
        {this.documentImages.map((image: string) => (
          <img src={image} />
        ))}
      </div>
    );
  }
}
