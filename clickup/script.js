async function getResponse (name, description = '',date_start, date_end) {
  const resp = await fetch(
    `https://api.clickup.com/api/v2/list/900802317279/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'pk_25571613_29CUOV70FLWK0ZU3QIVBD3U1YX54GW78'
      },

      body: JSON.stringify({
        name: name,
        description: description,
        due_date: Date.parse(date_end),
        due_date_time: false,
        start_date: Date.parse(date_start),
        start_date_time: false,
        notify_all: false,
        parent: null
      })
    }
  );
  return (await resp.json());
}

const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = document.getElementById("task").value;
  const desc = document.getElementById("desc").value;
  const date_start = document.getElementById("date_start").value;
  const date_end = document.getElementById("date_end").value;

  console.log(getResponse(task, desc, date_start, date_end));
  alert(`Task added: ${task}\nStart date: ${date_start}\nDue date: ${date_end}`);
})
