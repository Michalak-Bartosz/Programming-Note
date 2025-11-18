"""
Custom sorting functions for MkDocs Material tags plugin
Provides natural sorting for numeric prefixes in tag names
"""
import re
from typing import Union


def natural_sort_key(text: str) -> tuple:
    """
    Natural sort key function for tags with numeric prefixes.

    Converts a string into a tuple of integers and strings for natural sorting.
    This ensures that "1. Item" comes before "10. Item" instead of the default
    alphabetical order.

    Examples:
        "1. Creating a Variable" -> (1, '. Creating a Variable')
        "10. Kotlin Functions" -> (10, '. Kotlin Functions')
        "Basic Types" -> ('Basic Types',)

    Args:
        text: The text to convert to a sort key

    Returns:
        A tuple that can be used for natural sorting
    """
    def convert(part: str) -> Union[int, str]:
        """Convert text to int if it's a number, otherwise return lowercase string"""
        return int(part) if part.isdigit() else part.lower()

    # Split the string into alternating digit and non-digit parts
    parts = re.split(r'(\d+)', text)

    # Convert each part and return as tuple
    return tuple(convert(part) for part in parts if part)


def tag_name_natural(tag) -> tuple:
    """
    Sorting function for MkDocs Material tags plugin.

    This function is designed to be used with the tags_sort_by configuration
    in mkdocs.yml. It extracts the tag name and applies natural sorting.

    Args:
        tag: Tag object from Material's tags plugin

    Returns:
        A tuple representing the natural sort key for the tag name
    """
    # Get the tag name (handle both dict and object formats)
    if isinstance(tag, dict):
        tag_name = tag.get('name', '')
    else:
        tag_name = getattr(tag, 'name', str(tag))

    return natural_sort_key(tag_name)


def item_title_natural(item) -> tuple:
    """
    Natural sorting function for item titles in tags listings.

    This function is designed to be used with the listings_sort_by configuration
    in mkdocs.yml. It applies natural sorting to page titles.

    Args:
        item: Page item object from Material's tags plugin

    Returns:
        A tuple representing the natural sort key for the item title
    """
    # Get the title from the item
    if isinstance(item, dict):
        title = item.get('title', '')
    else:
        title = getattr(item, 'title', str(item))

    return natural_sort_key(title)

