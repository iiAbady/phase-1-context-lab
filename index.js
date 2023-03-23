/* Your Code Here */

function createEmployeeRecord(row) {
	return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
	}	
}

function createEmployeeRecords(employeeRowData) {
	return employeeRowData.map(row => {
		return createEmployeeRecord(row);
	})
}

function createTimeInEvent(dateStamp){
	const [date, hour] = dateStamp.split(' ');
	
	this.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour),
		date
	})
	
	return this;
}

function createTimeOutEvent(dateStamp) {
	const [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })

    return this;
}


function hoursWorkedOnDate(soughtDate) {
	const inEvent = this.timeInEvents.find(e => e.date === soughtDate);
	const outEvent = this.timeOutEvents.find(e => e.date === soughtDate);
	return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(dateSought) {
	const rawWage = hoursWorkedOnDate.call(this, dateSought);
        * this.payPerHour
    return parseFloat(rawWage.toString());
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName(srcArray, firstName) {
	return srcArray.find(rec => rec.firstName === firstName);
}

function calculatePayroll(arrayOfEmployeeRecords) {
	arrayOfEmployeeRecords.reduce((acc, curr) => acc + allWagesFor(curr), 0)
}