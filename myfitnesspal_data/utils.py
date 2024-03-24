def contains(unique, listItem):
    name = listItem[0]
    for items in unique:
        if items[0] == name:
            return True
    return False
