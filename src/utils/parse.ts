export interface ChatMessage {
  date: string;
  time: string;
  sender: string;
  message: string;
}

export function parseChatContent(content: string, limit: number): {
  formattedText: string;
} {
  const lines = content.split(/\r?\n/);
  const dateRegex = /^(\d{4}\/\d{2}\/\d{2})/;
  const messageRegex = /^(上午|下午)?(\d{1,2}:\d{2})\t(.+?)\t(.+)/;

  let currentDate: string | null = null;
  const results: ChatMessage[] = [];

  for (const line of lines) {
    if (line.trim() === '') continue;

    const dateMatch = line.match(dateRegex);
    if (dateMatch) {
      currentDate = dateMatch[1];
      continue;
    }

    const msgMatch = line.match(messageRegex);
    if (msgMatch && currentDate) {
      const [_, ampm, time, sender, message] = msgMatch;

      let hour = parseInt(time.split(':')[0], 10);
      const minute = time.split(':')[1];
      if (ampm === '下午' && hour < 12) hour += 12;
      if (ampm === '上午' && hour === 12) hour = 0;
      const fullTime = `${String(hour).padStart(2, '0')}:${minute}`;

      results.push({
        date: currentDate,
        time: fullTime,
        sender: sender.trim(),
        message: message.trim(),
      });
    }
  }

  const formattedText = results
    .map(r => `[${r.date} ${r.time}]${r.sender}: ${r.message}`)
    .slice(-limit)
    .join('\n');

  return {
    formattedText,
  };
}
