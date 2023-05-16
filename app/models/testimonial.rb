class Testimonial < ApplicationRecord
    validates :body, :author_id, :subject_id, presence: true

end