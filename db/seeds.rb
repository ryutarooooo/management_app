EMAIL = "test@example.com"
PASSWORD = "password"

START_DATE = Date.today - 11.months
END_DATE = Date.today + 1.months

NO_RECORD_CONSTANT = 5

MIN_WEIGHT = 600
MAX_WEIGHT = 620
DIV_CONSTANT = 10

user = User.find_or_create_by!(email: EMAIL) do |user|
  user.password = PASSWORD
  puts "テストユーザーの初期データインポートに成功しました。"
end

user.graphs.destroy_all

graphs = []
(START_DATE..END_DATE).each do |date|
  next if rand(NO_RECORD_CONSTANT).zero?
  graphs << {
    user_id: user.id,
    date: date,

    weight: rand(MIN_WEIGHT..MAX_WEIGHT).to_f / DIV_CONSTANT,
  }
end
Graph.create!(graphs)
puts "体重の初期データ投入に成功しました！"
