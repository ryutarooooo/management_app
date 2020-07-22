class GraphsController < ApplicationController
  def index
    gon.weight_records = Graph.chart_data(current_user)
    gon.weight_records = Graph.all
  end
end
