import { LitElement, css, html ,unsafeCSS} from 'lit'
import { customElement, property, query, queryAll } from 'lit/decorators.js'
import style from './index.css'
import animate from './animate.css'
enum Pages{
  login='login',
  forgetPassword='forgetPassword'
}
interface LoginResponse{
  message:string,
  error:boolean,
  redirect:boolean
}
@customElement('login-element')
export class loginElement extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]
  @property()
  current_page:Pages =Pages.login
  //definowanie inputów
  

  //dla logowania
  @query('#input_login_login')
  input_login_login?:HTMLInputElement
  @query('#input_password_login')
  input_password_login?:HTMLInputElement
  //przycik zaloguj
  @query(`#login_button`)
  login_button?:HTMLButtonElement
  //tworzenie erroru
  create_error(element:HTMLElement|HTMLInputElement,text_error:string){
    const element_error:HTMLElement = document.createElement('span')
    element_error.setAttribute('class', "text-xs tracking-wide text-red-600")
    element_error.innerText=text_error
    element_error.dataset.error_id = 'form_error'
    element.after(element_error)
  }
  create_server_response(element:HTMLElement|HTMLButtonElement,text:string,positive:boolean){
    const element_alert:HTMLElement = document.createElement('div')
    element_alert.dataset.error_id = 'form_error'
    if(positive){
      element_alert.setAttribute('class', "flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800")
      element_alert.innerHTML = `<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">${text}</span>
      </div>`
    }else{
      element_alert.setAttribute('class', "flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800")
      element_alert.innerHTML = `  <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">${text}</span>
      </div>`
    }
    element.before(element_alert)
 
  }
  delete_error(){
     this.shadowRoot?.querySelectorAll('[data-error_id="form_error"]').forEach(e => e.remove());
  }
  disable_button(button:HTMLButtonElement){
    if(button)
      button.disabled=true
  }
  enable_button(button:HTMLButtonElement){
    if(button)
    button.disabled=false
  }
  login_fn(){
    if(!this.login_button || !this.input_login_login || !this.input_password_login)
      return
    this.delete_error();
    this.disable_button(this.login_button )
    if(this.input_login_login.value.length ==0){
      this.enable_button(this.login_button)
      return this.create_error(this.input_login_login ,'Proszę podać login')
    }
    if(this.input_password_login.value.length ==0){
      this.enable_button(this.login_button)
      return this.create_error(this.input_password_login ,'Proszę podać hasło')
    }
    fetch(`/admin/login`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login:this.input_login_login.value,
        password:this.input_password_login.value
      })
    }).then((res) => res.json())
    .then((res:LoginResponse)=>{
        if("redirect" in res && res.redirect== true){
          setTimeout(() => {
            window.location.href = '/home';
          }, 2000);
        }else{
          this.enable_button(this.login_button as HTMLButtonElement)
        }
        this.create_server_response(this.login_button as HTMLButtonElement,res.message,res.error)
    })
    .catch(()=>{
      this.create_server_response(this.login_button as HTMLButtonElement,'Wystąpił błąd',true)
      this.enable_button(this.login_button as HTMLButtonElement)
    })
  }
  render() {
    return html`
    <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div
        class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
      >
        <div
          class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
        >
          <img
            src="/example.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div  class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 animated fadeInDown">
          <div>
            <div class="flex flex-row items-center justify-center lg:justify-start">
              <p class="text-lg mb-0 mr-4">Zaloguj się do Panelu</p>
            
            </div>
  
            <div
              class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
              <p class="text-center font-semibold mx-4 mb-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            </p>
            </div>
  
            <!-- Email input -->
            <div class="mb-6">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="input_login_login"
                placeholder="login"
              />
            </div>
  
            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="input_password_login"
                placeholder="Hasło"
              />
              
            </div>
  
            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
               
              </div>
              <button  class="text-gray-800">Zapomniałeś hasła?</button>
            </div>
  
            <div class="text-center lg:text-left">
     
              <button @click="${this.login_fn}" id="login_button"
                type="button"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Zaloguj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>  
    `
  }




}

declare global {
  interface HTMLElementTagNameMap {
    'login-element': loginElement
  }
}
