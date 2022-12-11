import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from '../index.css'
import animate from '../animate.css'
import { Pages_settings } from '../../interfaces/enums_pages'
import './setting_page_options/domain_option'
import './setting_page_options/smtp'
@customElement('setting-page')
export class SettingPage extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  //obecna strona
  @property()
  pages ={
    main:true,
    domainSetting:false,
    smtp_system_mail:false,
    smtp_newsletter:false
  }
  @property()
  current_page:Pages_settings = Pages_settings.main
  change_page(e:any){
    const _new_page:Pages_settings = e.target.getAttribute('data-page')
    if(!_new_page)
      return
    this.pages[_new_page] = true
    this.pages[this.current_page] = false
    this.current_page = _new_page
    }
  setPage(e:any){
    const page:Pages_settings = e.detail
    this.pages[page] = true
    this.pages[this.current_page] = false
    this.current_page = page
  }
  render() {
    if(this.current_page == Pages_settings.main){
      return html`
      <div class="flex justify-center h-full animated fadeInDown">
      <div class="flex rounded-lg shadow-lg bg-white text-center w-[80%] h-[98%] flex-col">
        <div class="py-3 px-6 border-b border-gray-300 ">
        <h5 class="text-gray-900 text-xl font-medium mb-2">Ustawienia systemowe</h5>
        </div>
        <div class="p-6 h-[80%] max-h-[100%] overflow-y-auto">
   
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="py-3 px-6 text-center">
                  Wykonaj jedną z poniższych operacji
                  </th>
                 
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <button data-page="${Pages_settings.domainSetting}" @click="${this.change_page}" class="cursor-pointer text-[#337ab7] hover:underline mx-auto flex">Ustawienia domeny</button> 
           </th>
                
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     <button data-page="${Pages_settings.smtp_system_mail}" @click="${this.change_page}"  class="cursor-pointer text-[#337ab7] hover:underline mx-auto flex">Konfiguracja smtp dla maili systemowych</button> 
                  </th>
                 
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <button data-page="${Pages_settings.smtp_newsletter}" @click="${this.change_page}" class="cursor-pointer text-[#337ab7] hover:underline mx-auto flex">Konfiguracja smtp dla newslettera</button> 
           </th>
             
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     <button class="cursor-pointer text-[#337ab7] hover:underline mx-auto flex">Microsoft Surface Pro</button> 
                  </th>
            
              </tr>
              <tr>
               <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     <button class="cursor-pointer text-[#337ab7] hover:underline mx-auto flex">Microsoft Surface Pro</button> 
                  </th>
            
              </tr>
          </tbody>
      </table>
  </div>  
  
        </div>
        <div class="py-3 px-6 border-t border-gray-300 text-gray-600 ">
          Pamiętaj, że wprowadzone zmiany mają wpływ na działanie serwisu
        </div>
      </div>
    </div>
      `
    }else if(this.current_page == Pages_settings.domainSetting){
      return html `<settingdomain-page></settingdomain-page>`
    }else if(this.current_page == Pages_settings.smtp_system_mail){
        return html`<settingsmtp-page @set-Page="${this.setPage}" .smtp_type="${Pages_settings.smtp_system_mail}"></settingsmtp-page>`
    }else{
      return html`<settingsmtp-page @set-Page="${this.setPage}" .smtp_type="${Pages_settings.smtp_newsletter}"></settingsmtp-page>`
    }
  
  }

}

