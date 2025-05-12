(function () {
  'use strict';
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();


document.querySelectorAll('.category-circle').forEach(circle => {
  circle.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const panel = document.getElementById(targetId);
    // Optionally collapse other panels
    document.querySelectorAll('.subcategory-panel').forEach(p => {
      if(p.id !== targetId) p.classList.remove('active');
    });
    // Toggle current panel
    panel.classList.toggle('active');
  });
});

// Toggle tax information display on switch change
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("change", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (let info of taxInfo) {
    info.style.display = (info.style.display === "none" || info.style.display === "") ? "inline" : "none";
  }
});