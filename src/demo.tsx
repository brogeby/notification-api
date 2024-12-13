const css = `
* {
	font-family: monospace;
}
body {
  margin: 0;
  padding: 0;
  height: 100vh;
	display: flex;
  justify-content: center;
  align-items: center;
  color: #ece2d0;
  background: #140918;
  }

body > div {
  scale: 1.5;
}
input[type="text"] {
  background: #ece2d0;
  padding: 15px;
	border-radius: 5px;
	width: 300px;
	border: 0px;
}
textarea {
  width: 300px;
	min-height: 100px;
	background: #ece2d0;
	border-radius: 5px;
	border: none;
	padding: 15px;
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
	padding: 10px 30px;
	background: none;
	border: 1px solid #ece2d0;
	color: #ece2d0;
	transition: 0.2s;
	cursor: pointer;
}
	button:hover {
	  background: #ece2d0;
		border: 1px solid transparent;
		color: #140918;
	}

  div:has(>label) {
    display: flex;
    gap: 10px;
  }
`;

const script = `
  const $form = document.querySelector('form')
  $form.addEventListener('submit', e => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const payload = Object.fromEntries(fd)

    fetch('/send-notification', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        providers: fd.getAll('providers') || [],
        contact: {
          first_name: 'Jocke',
          last_name: 'Ruby',
          email: 'RubyKing@example.com',
          teams_url: 'https://grades.webhook.office.com/webhookb2/a14c1f2a-4652-4dd9-90d0-5c3245108910@f58ac646-1014-490a-91e6-2f1b3b216caf/IncomingWebhook/cf775e3260884882a37db92b62500388/8408fab9-fed7-42f3-9d3f-3c298578a48c/V2lYqq7bpdSi0t1oCsjvAgXFjpF_rOeTAvkwXus0I0gFA1'
        },
        product: {},
        content: {
          subject: fd.get('subject'),
          body: fd.get('body')
        }
      })
    })
  })
`;

export default function DemoPage() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <h1>Notification API Demo</h1>
      <form action="/send-notification">
        <div>
          <p>Subject</p>
          <input type="text" name="subject" placeholder="Subject" />
        </div>
        <div>
          <p>Content</p>
          <textarea name="body" placeholder="Content..."></textarea>
        </div>

        <div>
          <label>
            <input type="checkbox" name="providers" value="teams" />
            Teams
          </label>
          <label>
            <input type="checkbox" name="providers" value="email" />
            Mail
          </label>
          <label>
            <input type="checkbox" name="providers" value="sms" />
            Sms
          </label>
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </div>
  );
}
