document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const nav = document.querySelector('.nav-account');

  // ✅ Signup Handler
  if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(signupForm);
      const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password')
      };

      try {
        const res = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
          alert('Signup successful!');

          const offcanvasEl = document.getElementById('register');
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
          offcanvas.hide();

          nav.innerHTML = `
            <li class="nav-icon-item dropdown">
              <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                <i class="icon icon-user"></i>
              </a>
              <ul class="dropdown-menu">
              <li><span class="dropdown-item-text"><strong>${result.email}</strong></span></li>
                <li>
                <li>
                  <form id="logoutForm">
                    <button type="submit" class="dropdown-item">Logout</button>
                  </form>
                </li>
              </ul>
            </li>
          `;

          window.location.reload(); // ✅ Refresh session-aware content
        } else {
          alert(result.message || 'Signup failed!');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again.');
      }
    });
  }

  // ✅ Logout Handler
  nav?.addEventListener('submit', async function (e) {
    if (e.target && e.target.id === 'logoutForm') {
      e.preventDefault();
      try {
        const res = await fetch('/logout', { method: 'POST' });
        const result = await res.json();
        if (result.success) {
          alert('Logged out!');
          nav.innerHTML = `
            <li class="nav-account">
              <a href="#login" data-bs-toggle="offcanvas" class="nav-icon-item">
                <i class="icon icon-user"></i>
              </a>
            </li>
          `;
        //   window.location.reload(); // ✅ Refresh view on logout too (optional)
        } else {
          alert('Logout failed!');
        }
      } catch (err) {
        console.error(err);
        alert('Error while logging out.');
      }
    }
  });

  // ✅ Login Handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const data = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      try {
        const res = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
          alert('Login successful!');

          const offcanvasEl = document.getElementById('login');
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
          offcanvas.hide();

          nav.innerHTML = `
            <li class="nav-icon-item dropdown">
              <a href="#" class="dropdown-toggle" data-bs-toggle="dropdown">
                <i class="icon icon-user"></i>
              </a>
              <ul class="dropdown-menu">
              <li><span class="dropdown-item-text"><strong>${result.email}</strong></span></li>
                <li>
                <li>
                  <form id="logoutForm">
                    <button type="submit" class="dropdown-item">Logout</button>
                  </form>
                </li>
              </ul>
            </li>
          `;

        //   window.location.reload(); // ✅ Refresh session-aware view
        } else {
          alert(result.message || 'Login failed!');
        }
      } catch (err) {
        console.error(err);
        alert('Login error. Please try again.');
      }
    });
  }
});
