<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte';
  import styles from './styles.css';
  import Logo from './logo.svelte'

	//import some Svelte Figma UI components
	import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte';
  
  let buzz = "1";
  let color = "yellow";

	// function cancel() {
	// 	parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
  // }
  

   function addMessage() {
    parent.postMessage({ pluginMessage: { 
      'type': 'buzzer-press', 
      'buzz': buzz,
    } }, '*');
  }

</script>


<div class="wrapper">


<div class="splash">
<Logo/>
</div>



  <div class="buzzer">
    <Button on:click={addMessage} class="buzz-button {color}"><span>Buzzer</span></Button>
  </div>

</div>