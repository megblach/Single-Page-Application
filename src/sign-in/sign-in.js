import $ from "jquery";
import axios from "axios";

export const signIn = () => {
  const form = $(`
        <form name="signIn" autocomplete="off" novalidate>
            <button type="button">Sign in</button>
           <label id="p_id" class="text-danger">
        </form>
    `);

  form.find("button").on("click", (event) => {
    event.preventDefault();

    // SOURCE: https://stackoverflow.com/a/13065407/2069114
    form.find("#p_id").text("Button still in progress");

    return form;
  });

  return form;
};
