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
  @State() top: string;
  @State() left: string;
  @State() showPinDrop = false;
  @State() currentPage: number = 0;

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

  nextPage() {
    if (this.currentPage + 1 !== this.pageCount) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage !== 0) {
      this.currentPage--;
    }
  }

  clickedDocument(event: MouseEvent) {
    this.showPinDrop = true;
    console.log(`Page clicked: ${this.currentPage + 1}`);
    console.log(`Location clicked - x: ${event.offsetX}; y: ${event.offsetY}`);
    this.top = `${event.offsetY}px`;
    this.left = `${event.offsetX}px`;
  }

  render() {
    return (
      <div>
        <div class="page-content">
          <img src={this.documentImages[this.currentPage]} onClick={ev => this.clickedDocument(ev)} />
        </div>
        <div class="page-navigation">
          <button onClick={() => this.prevPage()}>Previous</button>
          <button>Page {this.currentPage + 1}</button>
          <button onClick={() => this.nextPage()}>Next</button>
        </div>
        {this.showPinDrop && (
          <div class="pin-drop-holder" style={{ top: this.top, left: this.left }}>
            <div class="pin-drop"></div>
          </div>
        )}
      </div>
    );
  }
}
