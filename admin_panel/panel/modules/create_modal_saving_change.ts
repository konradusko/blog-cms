
export const createModal_update_changes = (shadowRoot:ShadowRoot)=>{
    const poup_update = document.createElement('div')
    poup_update.setAttribute('class',"flex absolute top-0 left-0 right-0 z-50   overflow-x-hidden overflow-y-auto md:inset-0 w-full h-full  animated fadeInDown")
    poup_update.id = "saving_changes_id"
    poup_update.innerHTML=`<div class="relative w-full h-full " style="
    display: flex;
    margin: auto;
">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 m-auto flex" style="
    margin: auto;
">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
        <div class="flex justify-center items-center">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
        </div>
    </div>
</div>`
shadowRoot.appendChild(poup_update)
}

