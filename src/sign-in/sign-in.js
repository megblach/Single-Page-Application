import $ from "jquery";
import axios from "axios";

export const signIn = () => {
  const form = $(`
        <form name="signIn" autocomplete="off" novalidate>
            <button type="button">Sign in</button>
           <p id="p_id" class="text-danger">Button is in progress.</p>
        </form>
    `);

  form.find("button").on("click", (event) => {
    event.preventDefault();
    const infoLabel = form.find("#p_id").val();
    //console.log(infoLabel);
    
    return form;
  });

  return form;
};
