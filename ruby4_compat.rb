# Ruby 4.0 removed taint tracking, but older Liquid/Jekyll still call it.
class String
  def tainted?; false; end
  def taint; self; end
  def untaint; self; end
end

class Object
  def tainted?; false; end
  def taint; self; end
  def untaint; self; end
end
