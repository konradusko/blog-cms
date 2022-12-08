import { LitElement,  html ,unsafeCSS} from 'lit'
import { customElement, property, query} from 'lit/decorators.js'
import style from './index.css'
import animate from './animate.css'


@customElement('panel-element')
export class PanelElement extends LitElement {
  public static styles = [unsafeCSS(style), unsafeCSS(animate)]

  render() {
    return html`
    <div class="md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300  h-[5rem]">
    
    <!-- logo -->
    <div class="flex-none w-56 flex flex-row items-center">
      <img src="img/logo.png" class="w-10 flex-none">
      <strong class="capitalize ml-1 flex-1">cleopatra</strong>

      <button id="sliderBtn" class="flex-none text-right text-gray-900 hidden md:block">
        <i class="fad fa-list-ul"></i>
      </button>
    </div>
    <!-- end logo -->   
    

    <!-- navbar content -->
    <div  class="animsated md:hidden md:fixed md:top-0 md:w-full md:left-0 md:mt-16 md:border-t md:border-b md:border-gray-200 md:p-10 md:bg-white flex-1 pl-3 flex flex-row flex-wrap justify-between items-center md:flex-col md:items-center">
      <!-- left -->
      <div class="text-gray-600 md:w-full md:flex md:flex-row md:justify-evenly md:pb-10 md:mb-10 md:border-b md:border-gray-200">
             <!-- left -->
      </div>
      <!-- end left -->      

      <!-- right -->
      <div class="flex flex-row-reverse items-center"> 

        <!-- right -->

      </div>
      <!-- end right -->
    </div>
    <!-- end navbar content -->

  </div>
<!-- end navbar -->


<!-- strat wrapper -->
<div  class="h-[calc(100vh_-_5rem)] flex flex-row flex-wrap">
  
    <!-- start sidebar -->
  <div  class="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster">
    

    <!-- sidebar content -->
    <div class="flex flex-col">

  
      <p class="uppercase text-xs text-gray-600 mb-4 tracking-wider">homes</p>

      <!-- link -->
      <a href="./index.html" class="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
        <i class="fad fa-chart-pie text-xs mr-2"></i>                
        test
      </a>
      <!-- end link -->

      
      

    </div>
    <!-- end sidebar content -->

  </div>
  <!-- end sidbar -->

  <!-- strat content -->
  <div class="bg-gray-100 flex-1 p-6 md:mt-16 "> 

    


  </div>
  <!-- end content -->

</div>
    `
  }




}

declare global {
  interface HTMLElementTagNameMap {
    'panel-element': PanelElement
  }
}
