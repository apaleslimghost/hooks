import { Meteor, Tracker } from 'meteor/tracker'
import { useEffect, useState } from 'react'

export const useTracker = (trackerFunction, dependencies = []) => {
	const [trackerData, setTrackerData] = useState(trackerFunction())

	useEffect(() => {
		const computation = Tracker.autorun(() => {
			setTrackerData(trackerFunction())
		})

		return () => computation.stop()
	}, dependencies)

	return trackerData
}
