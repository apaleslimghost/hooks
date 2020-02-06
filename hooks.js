import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
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

export const useSubscription = (subscription, ...args) => useTracker(() => subscription && Meteor.subscribe(subscription, ...args).ready(), [subscription, ...args])
export const useCursor = (cursor, deps = []) => useTracker(() => cursor && cursor.fetch(), deps)
export const useFindOne = (collection, query, deps = []) => useTracker(() => collection.findOne(query), deps)
