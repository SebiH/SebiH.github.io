<div class="main-content centeredcontainer" data-ng-controller="ContactController">

    <div class="contact-form-container centered" data-ng-hide="formSent">
        <h1>
            Want to tell me something?
        </h1>

        <div class="hcenter">
            <form name="form" class="pure-form contact-form" novalidate data-ng-submit="form.$valid && send()">

                <label>
                    <span> Name*: </span>
                    <span class="form-error" data-ng-if="(form.$submitted || form.name.$touched) && form.name.$error.required"> 
                        Please tell me your name 
                    </span>
                </label>
                <input data-ng-model="data.name" name="name" class="pure-input-1" required>


                <label>
                    <span> Email*: </span>
                    <span class="form-error" data-ng-if="(form.$submitted || form.email.$touched) && (form.email.$error.required || form.email.$error.email)">
                        Please enter a valid Email address 
                    </span>
                </label>
                <input data-ng-model="data.email" name="email" class="pure-input-1" type="email" required>

                <label>
                    <span> Subject: </span>
                </label>
                <input data-ng-model="data.subject" name="subject" class="pure-input-1">

                <label>
                    <span> Message*: </span>
                    <span class="form-error" data-ng-if="(form.$submitted || form.message.$touched) && form.message.$error.required"> 
                        You need to enter a message 
                    </span>
                </label>
                <textarea class="pure-input-1 form-textarea" data-ng-model="data.message" name="message" required></textarea>

                <div>
                    <button class="form-submit pure-button pure-button-primary" type="submit">
                        Send!
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div class="centered" data-ng-show="formSent">
        <div class="hcenter">
            <h1> Thanks for the message! </h1>
        </div>
    </div>
</div>

