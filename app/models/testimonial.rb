class Testimonial < ApplicationRecord
    validates :body, :author_id, :subject_id, presence: true

    belongs_to :author,
    class_name: :User

    belongs_to :subject,
    class_name: :User

end