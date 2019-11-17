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

export const useSubscription = (...args) => useTracker(() => Meteor.subscribe(...args).ready(), [...args])
export const useCursor = (cursor, deps = []) => useTracker(() => cursor.fetch(), deps)
export const useFindOne = (collection, query, deps = []) => useTracker(() => collection.findOne(query), deps)