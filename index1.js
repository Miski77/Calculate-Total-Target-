function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let current = new Date(start);
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
  
    
    function countWorkingDaysInMonth(year, month) {
      let daysInMonth = new Date(year, month + 1, 0).getDate(); 
      let workingDays = 0;
  
      for (let day = 1; day <= daysInMonth; day++) {
        let date = new Date(year, month, day);
        let dayOfWeek = date.getDay(); 
        if (dayOfWeek !== 5) workingDays++; 
      }
  
      return workingDays;
    }
  
    while (current <= end) {
      let year = current.getFullYear();
      let month = current.getMonth();
      let totalWorkingDays = countWorkingDaysInMonth(year, month);
      
      daysExcludingFridays.push(totalWorkingDays);
  
      
      let workedDays = 0;
      for (let day = new Date(current); day.getMonth() === month && day <= end; day.setDate(day.getDate() + 1)) {
        if (day >= start && day.getDay() !== 5) workedDays++;
      }
      daysWorkedExcludingFridays.push(workedDays);
  
      current.setMonth(current.getMonth() + 1); 
    
    }
    const totalDaysWorked = daysWorkedExcludingFridays.reduce((sum, days) => sum + days, 0);
  

    for (let days of daysWorkedExcludingFridays) {
      monthlyTargets.push((totalAnnualTarget * (days / totalDaysWorked)).toFixed(2));
    } 
   
    const totalTarget = monthlyTargets.reduce((sum, target) => sum + parseFloat(target), 0);
  
    return {
      daysExcludingFridays,
      daysWorkedExcludingFridays,
      monthlyTargets,
      totalTarget
    };
  }
  console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));