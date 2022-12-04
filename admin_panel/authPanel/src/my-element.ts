import { LitElement, css, html ,unsafeCSS} from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from './index.css'
import animate from './animate.css'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  render() {
    return html`
    
    `
  }




}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
