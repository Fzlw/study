import json

a = [1, 4, 7]
b = [2, 3, 5]
c = zip(a, b)

# print(json.dumps(zip(*c)))
print(type(json.dumps(a)))