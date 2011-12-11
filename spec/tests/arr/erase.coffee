define ['arr/erase'], (erase) ->
  module 'arr/erase'
  test 'erasing an item', ->
    arr = [1, 2, 3]
    erase arr, 2
    deepEqual arr, [1,3], 'erased 2'
    erase arr, 4
    deepEqual arr, [1,3], 'ignores non-existent items'

