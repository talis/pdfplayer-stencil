import { Component, h, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'talis-pdf-viewer',
  styleUrl: 'talis-pdf-viewer.css',
  shadow: false,
})
export class TalisPdfViewer {
  @Prop() depotUrl: string;
  @Prop() token: string;
  @Prop() pageCount: number;
  @Prop() annotations: string;
  @Prop() currentPage: number;
  @State() hasLoaded = false;
  @State() showPinDrop = false;
  @State() top: string;
  @State() left: string;
  @Element() el: HTMLElement;

  documentImages: string[] = [];
  @State() annotationsArray: any[] = [];

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

  getCurrentAnnotation() {
    const annotationsArray = JSON.parse(this.annotations);
    this.annotationsArray = annotationsArray.filter(annotation => {
      return parseInt(annotation.hasTarget[2].uri.slice(-1)) === this.currentPage;
    });
  }

  getImageDimensions() {
    const img = this.el.querySelector('img');
    const { offsetLeft: x, offsetTop: y, width, height } = img;
    return { x, y, width, height };
  }

  getLocationDetails(annotation) {
    const locationDetails = annotation.hasTarget[1].fragment.split('percentage=')[1];
    const [locX, locY] = locationDetails.split(',');
    const { x, y, width, height } = this.getImageDimensions();
    const top = y + (parseInt(locY) / 100) * height;
    const left = x + (parseInt(locX) / 100) * width;

    return { top: top + 'px', left: left + 'px' };
  }

  clickedDocument(event: MouseEvent) {
    console.log(`Page clicked: ${this.currentPage + 1}`);
    console.log(`Location clicked - x: ${event.offsetX}; y: ${event.offsetY}`);
    this.top = `${event.offsetY}px`;
    this.left = `${event.offsetX}px`;
    this.showPinDrop = true;
  }

  render() {
    return (
      <div>
        <div class="page-content">
          <img src={this.documentImages[this.currentPage]} onClick={ev => this.clickedDocument(ev)} onLoad={() => this.getCurrentAnnotation()} />
          {this.annotationsArray.length > 0 &&
            this.annotationsArray.map(annotation => {
              const { top, left } = this.getLocationDetails(annotation);
              return (
                <div class="pin-drop-holder" style={{ top, left }}>
                  <div class="pin-drop red"></div>
                </div>
              );
            })}
          {this.showPinDrop && (
            <div class="pin-drop-holder" style={{ top: this.top, left: this.left }}>
              <div class="pin-drop"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
