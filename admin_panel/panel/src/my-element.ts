import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from './index.css'
import animate from './animate.css'


@customElement('panel-element')
export class PanelElement extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]

  render() {
    return html`

    `
  }




}

declare global {
  interface HTMLElementTagNameMap {
    'panel-element': PanelElement
  }
}
