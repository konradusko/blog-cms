import {html} from 'lit'
export const get_error_true_module = (error_text:string,refreshButtonFunction:Function)=> html`  <div  class="p-4 mb-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-200 animated fadeInDown" >
<div class="flex items-center">
  <svg aria-hidden="true" class="w-5 h-5 mr-2 text-red-900 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  <span class="sr-only">Info</span>
  <h3 class="text-lg font-medium text-red-900 dark:text-red-800">Wystąpił błąd</h3>
</div>
<div class="mt-2 mb-4 text-sm text-red-900 dark:text-red-800">
  ${error_text}
</div>
<div class="flex">
  <button @click="${refreshButtonFunction}" type="button" class="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900">
  <svg class="-ml-0.5 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
    Spróbuj ponownie
  </button>
 
</div>
</div>`