module.exports = '<form class="form-light mt-20" role="form">\n    \n    <div class="form-group">\n        <label>Name</label>\n        <input name="name" type="text" class="form-control" placeholder="Your name" value="<%- form ? form.name : \'\' %>">\n    </div>\n    <div class="row">\n        <div class="col-md-6">\n            <div class="form-group">\n                <label>Email</label>\n                <input name="email" type="email" class="form-control" placeholder="Email address" value="<%- form ? form.email : \'\' %>">\n            </div>\n        </div>\n        <div class="col-md-6">\n            <div class="form-group">\n                <label>Phone</label>\n                <input name="phone" type="text" class="form-control" placeholder="Phone number" value="<%- form ? form.phone : \'\' %>">\n            </div>\n        </div>\n    </div>\n    <div class="form-group">\n        <label>Subject</label>\n        <input name="subject" type="text" class="form-control" id="subject" placeholder="Subject" value="<%- form ? form.subject : \'\' %>"\n    </div>\n    <div class="form-group">\n        <label>Message</label>\n        <textarea name="message" class="form-control" placeholder="Write you message here..." style="height:100px;"><%- form ? form.message : \'\' %></textarea>\n    </div>\n\n    <div class="form-group">\n        <div id="recaptchaDiv"></div>\n        <% if(form.error){ %>\n            <span class="label label-danger">\n                <%= form.error %>\n            </span>\n        <% } %>\n    </div>\n\n    <button ng-if="!contactsubmitted" ng-click="submitcontactform()" type="button" class="btn btn-two">Send message</button>\n\n</form>';