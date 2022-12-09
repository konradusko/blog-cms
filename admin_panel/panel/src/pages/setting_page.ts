import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from '../index.css'
import animate from '../animate.css'

@customElement('setting-page')
export class SettingPage extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  //obecna strona

  render() {
    return html`
    <div class="flex justify-center h-full animated fadeInDown">
    <div class="flex rounded-lg shadow-lg bg-white text-center w-[80%] h-[98%] flex-col">
      <div class="py-3 px-6 border-b border-gray-300 ">
      <h5 class="text-gray-900 text-xl font-medium mb-2">Ustawienia systemowe</h5>
      </div>
      <div class="p-6 h-[80%] max-h-[100%] overflow-y-auto">
      <div class="grid grid-cols-2 gap-2">
      <button type="button" class="inline-block px-6 py-5 bg-purple-600 text-white text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out   font-bold ">Ustawienia Maili</button>
      <button type="button" class="inline-block px-6 py-5 bg-purple-600 text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">Ustawienia logowania</button>
      <button type="button" class="inline-block px-6 py-5 bg-purple-600 text-white font-bold text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">Domena</button>
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

