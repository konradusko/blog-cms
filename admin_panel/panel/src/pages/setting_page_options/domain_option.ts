import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from '../../index.css'
import animate from '../../animate.css'
import { Pages_settings } from '../../../interfaces/enums_pages'
@customElement('settingdomain-page')
export class DomainOption extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  //obecna strona
  changePage(e:any){
    const route:Pages_settings = Pages_settings.main
    const options = {
        detail: {[route]:true},
        bubbles: true,
        composed: true
      };
    this.dispatchEvent(new CustomEvent('set-Page', options))
}
  render() {
    return html`
    <div class="flex justify-center h-full animated fadeInDown">
    <div class="flex rounded-lg shadow-lg bg-white text-center w-[80%] h-[98%] flex-col">
      <div class="py-3 px-6 border-b border-gray-300 ">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Ustawienia systemowe</h5>
      </div>
      <div class="p-6 h-[80%] max-h-[100%] overflow-y-auto">
 
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <button @click="${this.changePage}">Powrót</button>
</div>  

      </div>
      <div class="py-3 px-6 border-t border-gray-300 text-gray-600 ">
        Pamiętaj, że wprowadzone zmiany mają wpływ na działanie serwisu
      </div>
    </div>
  </div>
    `
  }

}

