// Function to check if today is a Japanese national holiday
async function CheckJapaneseHoliday() {
  try {
      const today = new Date();
      const year = today.getFullYear();
      const countryCode = 'JP';
      const nagerUrl = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

      // Fetch the public holidays data
      const response = await fetch(nagerUrl);

      if (!response.ok) {
          throw new Error(`Nager.Date API request failed with status ${response.status}`);
      }

      const holidays = await response.json();

      // Format today's date as YYYY-MM-DD
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      // Check if today is a holiday
      const todayHoliday = holidays.find((holiday: { date: string; }) => holiday.date === todayStr);

      if (todayHoliday) {
        return true
      }
  } catch (error) {
      console.log('Error checking Japanese holiday:');
  }
}

export default CheckJapaneseHoliday;