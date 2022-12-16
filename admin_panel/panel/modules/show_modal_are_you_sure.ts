export const remove_modal_are_your_sure = (shadowRoot:ShadowRoot)=>{
    if(shadowRoot.querySelector('#modal_are_you_sure'))
        shadowRoot.querySelector('#modal_are_you_sure')?.remove()
}
export const create_modal_are_your_sure = (shadowRoot:ShadowRoot,callbackFunction:Function)=>{
    const modal_check = document.createElement('div')
    modal_check.setAttribute('class',"flex absolute top-0 left-0 right-0 z-50   overflow-x-hidden overflow-y-auto md:inset-0 w-full h-full  animated fadeInDown")
    modal_check.id = "modal_are_you_sure"
    
    const div_wrapper = document.createElement('div')
    div_wrapper.setAttribute('class','relative w-full h-full') 
    div_wrapper.setAttribute('style',`display: flex;
    margin: auto;`) 


    const second_div_wrapper = document.createElement('div')
    second_div_wrapper.setAttribute('class','relative bg-white rounded-lg shadow dark:bg-gray-700 m-auto flex') 
    second_div_wrapper.setAttribute('style',`display: flex; margin: auto;`)

    
    const button_x_close = document.createElement('button')
    button_x_close.setAttribute('class','absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white')
    button_x_close.innerHTML=`<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    <span class="sr-only">Close modal</span>`

    const div_wrapper_inner = document.createElement('div')
    div_wrapper_inner.setAttribute('class',`p-6 text-center`)
    div_wrapper_inner.innerHTML = `<svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Czy jesteś pewien swojej decyzji?</h3>`

    const button_yes = document.createElement('button')
    button_yes.setAttribute('class',`text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`)
    button_yes.innerText=`Tak`
    const button_no = document.createElement('button')
    button_no.setAttribute('class',`text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`)
    button_no.innerText = `Nie`


    modal_check.appendChild(div_wrapper)
    div_wrapper.appendChild(second_div_wrapper)
    second_div_wrapper.appendChild(button_x_close)
    second_div_wrapper.appendChild(div_wrapper_inner)
    div_wrapper_inner.appendChild(button_yes)
    div_wrapper_inner.appendChild(button_no)

    button_x_close.addEventListener('click',()=>{
        if(shadowRoot.querySelector('#modal_are_you_sure'))
            shadowRoot.querySelector('#modal_are_you_sure')?.remove()
    })
    button_no.addEventListener('click',()=>{
        if(shadowRoot.querySelector('#modal_are_you_sure'))
            shadowRoot.querySelector('#modal_are_you_sure')?.remove()
    })
    button_yes.addEventListener('click',()=>{
            return callbackFunction()
    })

shadowRoot.appendChild(modal_check)
}

