import { error } from '@sveltejs/kit';
import { getShowcaseEntry } from '../../../showcase/catalog.js';

export function load({ params }) {
	const entry = getShowcaseEntry(params.slug);
	if (!entry) error(404, 'Unknown component');
	return { entry };
}
